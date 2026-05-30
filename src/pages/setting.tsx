import Navbar from "../components/navbar"
import SettingPanel from "../components/settingPanel";
export default function Setting(){

    return (
        <>
            <Navbar />
            <div className="flex w-screen h-screen items-start justify-center mt-12">
                <SettingPanel />
            </div>
            
        </>
    )
}