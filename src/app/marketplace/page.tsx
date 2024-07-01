import PostSearch from "@/components/PostSearch";
import Posts from "@/components/Posts";
import SideFilter from "@/components/SideFilter";
const Marketplace = () => {
    return (
        <div>

        <div className="hidden md:flex flex-col p-4">
            <div className="mb-4">
                <PostSearch />
            </div>
            <div className="flex flex-row ">
                <div className="w-1/4 p-4">
                    <SideFilter />
                </div>
                <div className="w-3/4 p-4">
                    <h1 className="text-xl font-bold mb-4">Posts</h1>
                    <Posts/>
                </div>
            </div>
        </div>
        <div className="md:hidden flex flex-col p-4">
            <div className="mb-4">
                <PostSearch />
            </div>
            <div className="flex flex-col ">
                <div className="">
                    <h1 className="text-xl font-bold mb-4">Filter</h1>
                    <SideFilter />
                </div>
                <div className="py-4">
                    <h1 className="text-xl font-bold mb-4">Posts</h1>
                    <Posts/>
                </div>
            </div>
        </div>
        </div>

    );
}

export default Marketplace;

