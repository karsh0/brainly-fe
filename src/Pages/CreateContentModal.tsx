import { useRef, useState } from "react";
import { CrossIcon } from "../components/Icons/CrossIcon";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "Youtube",
    Twitter = "Twitter",
    Link = "Link",
    Document = "Document",
}

export function CreateContentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube);
    const [tags, setTags] = useState<string []>([])

    const addTags = (event:  React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const newTag = tagsRef.current?.value.trim(); 
            if (newTag && !tags.includes(newTag)) {    
                setTags([...tags, newTag]);
            }
            if (tagsRef.current) {
                tagsRef.current.value = "";
            }
        }
    };
    

    async function handleAddContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const content = contentRef.current?.value;
        try {
            await axios.post(
                `${BACKEND_URL}/api/v1/content`,
                { title, link, tags, type, content },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            onClose();
        } catch (error) {
            console.error("Error adding content:", error);
        }
    }

    return (
        open && (
            <div>
                <div className="w-screen h-screen bg-gray-600 bg-opacity-60 fixed top-0 left-0 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md w-96">
                        <div className="flex justify-between pb-2">
                            <h3 className="text-[#676767] text-xl font-semibold">Create New Content</h3>
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-[#676767] mb-2">Title</label>
                                <Input reference={titleRef} placeholder="15 Character limit" />
                            </div>
                            <div>
                                <label className="block text-[#676767] mb-2">Link (Optional)</label>
                                <Input reference={linkRef} placeholder="Enter URL" />
                            </div>
                            <div>
                                <label className="block text-[#676767] mb-2">Type</label>
                                <select
                                    className="w-full border p-2 rounded-lg"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as ContentType)}
                                >
                                    <option value={ContentType.Youtube}>Video</option>
                                    <option value={ContentType.Twitter}>Tweet</option>
                                    <option value={ContentType.Link}>Link</option>
                                    <option value={ContentType.Document}>Document</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[#676767] mb-2">Tags</label>
                                <Input reference={tagsRef} placeholder="Add Tags" onKeyUp={addTags} />
                                <div className="flex flex-wrap p-1 gap-1">
                                {tags.map((tag)=> <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-black mx-1"><span>{tag}</span><CrossIcon size="size-4"/></div>)}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[#676767] mb-2">Content (Optional)</label>
                                <textarea
                                    className="border-gray-500 border w-full rounded p-2"
                                    rows={4}
                                    ref={contentRef}
                                    placeholder="Enter content details"
                                ></textarea>
                            </div>
                            <div className="flex justify-center">
                                <Button onClick={handleAddContent} size="md" variant="primary" title="Submit" fullWidth />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
