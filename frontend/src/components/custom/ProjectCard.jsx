import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Badge } from "@/components/ui/badge"



const ProjectCard = ({ title = "New Project", description = "Project Desc.", projId }) => {
    return (
        <Card className="hover:shadow-xl">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis provident reprehenderit sint et aliquam omnis quas, quaerat corporis laborum minima aliquid sequi unde voluptas excepturi culpa alias quos quia facilis nam facere quo dolorem amet magnam harum? Eveniet veritatis harum error omnis. Delectus vero quam in amet labore accusamus ducimus!</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                {/* <p><span>Number of pages: </span>5</p> */}
                <Badge variant="outline">Number of pages: 5</Badge>

                <Button className='bg-green-500 hover:bg-green-400 text-white  font-bold py-2 px-4 rounded'>View Project</Button>
            </CardFooter>
        </Card>
    )
}

export default ProjectCard
