import { AvatarName } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <div>
            BlogApp
        </div>
        <div>
            <AvatarName name="Krishnadev"/>
        </div>
    </div>
}