import {Input} from '../components/ui/input'

const PostSearch: React.FC = () => {
    return(
        <div className='flex flex-row gap-7'>
            <Input placeholder='Search a post...(⚠️ Future feature)'/>
        </div>
    )
}

export default PostSearch