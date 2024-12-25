import { useEffect, useState } from "react"
import { PlusIcon } from "../components/Icons/PlusIcon"
import { ShareIcon } from "../components/Icons/ShareIcon"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Sidebar } from "../components/ui/Sidebar"
import {CreateContentModal} from "./CreateContentModal"
import { BACKEND_URL } from "../config"
import axios from "axios"

interface Content {
  link: string; 
  [key: string]: any; 
}

export const Homepage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [contents, setContents] = useState<Content []>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => setContents(response.data.content));
  }, [modalOpen]);

  const handleDelete = (link: any) => {
    // Update the contents by filtering out the deleted card
    setContents((prevContents) =>
      prevContents.filter((content) => content.link !== link)
    );
  };

  return (
    <div className="flex text-gray-700">
      <CreateContentModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <Sidebar />
      <div className="max-w-full w-full h-full p-10">
        <div className="flex flex-col sm:flex-row justify-between pb-5">
          <h1 className="text-3xl text-bold">All Notes</h1>
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  {
                    share: true,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                const shareUrl = response.data.hash;
                alert(shareUrl);
              }}
              startIcon={<ShareIcon />}
              size="md"
              title={"Share brain"}
              variant={"secondary"}
            />

            <Button
              startIcon={<PlusIcon />}
              onClick={() => {
                setModalOpen(true);
              }}
              size="md"
              title={"Add content"}
              variant={"primary"}
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {contents.map(({ title, content, type, link, tags }) => (
            <Card
              key={link}
              title={title}
              content={content}
              link={link}
              type={type}
              tags={tags}
              onDelete={handleDelete} // Pass down the delete handler
            />
          ))}
        </div>
      </div>
    </div>
  );
};
