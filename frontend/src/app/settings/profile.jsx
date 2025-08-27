import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdEdit } from "react-icons/md";

export default function ProfilePage() {
    return (
        <div className="flex flex-1 flex-col gap-4">
            <form action="#" className="space-y-5">
                <div className="h-[80px] w-[80px] rounded-full shadow p-[4px] bg-white relative cursor-pointer">
                    <img src={`/logo.svg`} alt="profile-img" loading="lazy" className="w-full h-full rounded-full" />
                    <button className="cursor-pointer w-[25px] h-[25px] bg-white shadow rounded-full flex items-center justify-center absolute bottom-0 right-0">
                        <MdEdit className="text-[16px]" />
                    </button>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <Input readOnly
                        value={""}
                        placeholder={`kellscodes`}
                        className={`cursor-not-allowed h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                        name="username"
                        id="username"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input readOnly
                        value={""}
                        placeholder={`kellyn@gmail.com`}
                        className={`cursor-not-allowed h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                        name="email"
                        id="email"
                        type={'email'}
                    />
                </div>
                <div>
                    <label htmlFor="firstname" >Firstname</label>
                    <Input
                        value={""}
                        placeholder={`Firstname`}
                        className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                        name="firstname"
                        id="firstname"
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Lastname</label>
                    <Input
                        value={""}
                        placeholder={"Lastname"}
                        className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                        name="lastname"
                        id="lastname"
                    />
                </div>
                <div>
                    <label htmlFor="profession">Profession</label>
                    <Input
                        value={""}
                        placeholder={`Profession e.g Analyst`}
                        className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out`}
                        name="profession"
                        id="profession"
                    />
                </div>
                <Button className={`bg-prim h-[50px] hover:bg-prim hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer w-full`}>Save Changes</Button>
            </form>
            {/* Add your profile settings components here */}
        </div>
    );
}