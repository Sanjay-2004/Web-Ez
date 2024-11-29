import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Badge } from "@/components/ui/badge"



const PageCard = ({ title = "New Project", projectName = "default project", pageId }) => {
    return (
        <div className="flex justify-between items-center px-5 border hover:shadow-xl p-5 rounded-md">
            <div>
                <p className="text-xl mb-3 font-semibold">{title}</p>
                <CardDescription>{projectName}</CardDescription>
            </div>
            <Button className='bg-green-500 hover:bg-green-400 text-white  font-bold py-2 px-4 rounded'>View Page</Button>
        </div>
    )
}

export default PageCard
