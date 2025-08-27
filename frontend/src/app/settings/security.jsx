import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SecurityPage() {
    return (
        <div className="flex flex-1 flex-col gap-4">
            <form action="#" className="space-y-5">
                <div>
                    <label htmlFor="passowrd" >Passowrd</label>
                    <Input
                        value={""}
                        placeholder="Password"
                        className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                        name="passowrd"
                        id="passowrd"
                    />
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirm password</label>
                    <Input
                        value={""}
                        placeholder="confirm password"
                        className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                        name="confirm_password"
                        id="confirm_password"
                    />
                </div>

                <Button className={`bg-prim h-[50px] hover:bg-prim hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer w-full`}>Change Password</Button>
            </form>
        </div>
    );
}