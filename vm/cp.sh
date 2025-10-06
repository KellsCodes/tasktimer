#!/bin/bash
################# Control plane (cp.sh) ################


# Check to see if the script has been run before. Exit out if so.
FILE=/k8scp_run
if [ -f "$FILE" ]; then
    echo "WARNING!"
    echo "$FILE exists. Script has already been run on control plane."
    echo
    exit 1
else
    echo "$FILE does not exist. Running  script"
fi


# Create a file when this script is started to keep it from running
# twice on same node
sudo touch /k8scp_run

# Update the system
sudo apt-get update ; sudo apt-get upgrade -y

# Install necessary software
sudo apt-get install curl apt-transport-https vim git wget gnupg2 software-properties-common apt-transport-https ca-certificates socat -y

# Add repo for Kubernetes
sudo mkdir -m 755 -p /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.34/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.34/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list

# Install the Kubernetes software, and lock the version
sudo apt-get update
sudo apt-get -y install kubelet=1.34.1-1.1 kubeadm=1.34.1-1.1 kubectl=1.34.1-1.1
sudo apt-mark hold kubelet kubeadm kubectl

# Ensure Kubelet is running
sudo systemctl enable --now kubelet

# Disable swap just in case
sudo swapoff -a

# Ensure Kernel has modules
sudo modprobe overlay
sudo modprobe br_netfilter

# Update networking to allow traffic
cat <<EOF | sudo tee /etc/sysctl.d/kubernetes.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

sudo sysctl --system

# Configure containerd settings
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF

sudo sysctl --system

# Install the containerd software
#curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
#sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
#sudo apt-get update
#sudo apt-get install containerd.io -y
#
# Add Docker's official GPG key:
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update && sudo apt-get install containerd.io -y

# Configure containerd and restart
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo sed -e 's/SystemdCgroup = false/SystemdCgroup = true/g' -i /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl enable containerd


#  Create the config file so no more errors
# Install and configure crictl
export VER="v1.26.0"

wget https://github.com/kubernetes-sigs/cri-tools/releases/download/$VER/crictl-$VER-linux-amd64.tar.gz

tar zxvf crictl-$VER-linux-amd64.tar.gz

sudo mv crictl /usr/local/bin

# Set the endpoints to avoid the deprecation error
sudo crictl config --set \
runtime-endpoint=unix:///run/containerd/containerd.sock \
--set image-endpoint=unix:///run/containerd/containerd.sock

# Configure the cluster
# This assumes you are not using 10.0.0.0/8 for your host. If your node network is in the same range you will lose connectivity to otr nodes.
sudo kubeadm init --kubernetes-version=1.34.1 --pod-network-cidr=10.0.0.0/8  | sudo tee /var/log/kubeinit.log

# Configure the non-root user to use kubectl
mkdir -p $HOME/.kube
sudo cp -f /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

sleep 3
echo Saving worker join command....
echo

# Save join command for workers
kubeadm token create --print-join-command > /vagrant/join.sh
chmod +x /vagrant/join.sh

echo  Saved worker join command on join.sh
sleep 3
echo

# Use Calico as the network plugin
echo '********************************************************'
echo '********************************************************'
echo
echo Installing Project Calico, this may take a bit...
echo
echo '********************************************************'
echo '********************************************************'
echo

sleep 5

su - vagrant -c "
  wget https://github.com/projectcalico/calico/archive/refs/tags/v3.30.3.tar.gz -O calico-v3.30.3.tar.gz
  tar -xzf calico-v3.30.3.tar.gz
  kubectl apply -f calico-3.30.3/manifests/calico.yaml
"

echo
sleep 3
echo "Calico install finished. Continuing with script."
echo


# Add Helm to make our life easier
wget https://get.helm.sh/helm-v3.18.1-linux-amd64.tar.gz
tar -xf helm-v3.18.1-linux-amd64.tar.gz
sudo cp linux-amd64/helm /usr/local/bin/

sleep 15

sudo crictl config --set \
runtime-endpoint=unix:///run/containerd/containerd.sock \
--set image-endpoint=unix:///run/containerd/containerd.sock

sleep 19

# Output the state of the cluster
kubectl get node

# Ready to continue
sleep 3
echo
echo
echo '***************************'
echo
echo "Continue to the next step"
echo
echo '***************************'
echo

