#!/bin/bash

# Disable swap
# The "sed" command correctly comments out the swap entry in /etc/fstab to make the change permanent.
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Configure sysctl for Kubernetes
# Ensure kernel modules are loaded and persist across reboots.
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF
sudo modprobe overlay
sudo modprobe br_netfilter

# Set required sysctl parameters, which will also persist after reboots.
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

# Apply the new settings without a reboot.
sudo sysctl --system

# Install containerd runtime
# Update apt repositories, then install containerd.
sudo apt-get update
sudo apt-get install -y containerd

# Create default containerd configuration.
sudo mkdir -p /etc/containerd
sudo containerd config default | sudo tee /etc/containerd/config.toml

# Configure containerd to use the "systemd" cgroup driver, which is recommended for Kubernetes.
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/g' /etc/containerd/config.toml

# Restart and enable the containerd service.
sudo systemctl restart containerd
sudo systemctl enable containerd

# Install kubeadm, kubectl, and kubelet
# Add the Kubernetes apt repository and GPG key.
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# Update apt repositories to include the new Kubernetes repository.
sudo apt-get update

# Install the Kubernetes tools.
sudo apt-get install -y kubelet kubeadm kubectl

# Add a hold on the Kubernetes tools to prevent automatic upgrades.
sudo apt-mark hold kubelet kubeadm kubectl
