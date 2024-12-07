import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Badge } from "@/components/ui/badge"



const ProjectCard = ({ title = "New Project", description = "Project Desc.", pages, openProject }) => {
    return (
        <Card className="hover:shadow-xl">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                {/* <p><span>Number of pages: </span>5</p> */}
                <Badge variant="outline">Number of pages: {pages}</Badge>

                <Button onClick={openProject} className='bg-green-500 hover:bg-green-400 text-white  font-bold py-2 px-4 rounded'>View Project</Button>
            </CardFooter>
        </Card>
    )
}

export default ProjectCard
