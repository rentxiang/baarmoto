import { Button } from "./ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const DeletePost: React.FC<{ onDeleteUpdated: () => void }> = ({
  onDeleteUpdated,
}) => {
  const router = useRouter();
  const { id } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    if (id) {
      try {
        setIsDeleting(true);
        const response = await fetch(`/api/delete-post/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          setIsDeleting(false);
          toast("Error when deleting");
          throw new Error("Failed to delete post");
        }
        setIsDeleting(false);
        toast("Successfully deleted");
        router.push("/marketplace");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleDelete}>
        {isDeleting ? "..." : <MdOutlineDeleteForever />}
      </Button>
    </div>
  );
};

export default DeletePost;
