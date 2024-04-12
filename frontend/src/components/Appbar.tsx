import { AvatarName } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="font-bold text-2xl">
            BlogApp
        </div>
        <div>
            <AvatarName name="Krishnadev"/>
        </div>
    </div>
}