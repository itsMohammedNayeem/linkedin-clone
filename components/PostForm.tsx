"use client";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

function PostForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLFormElement>(null);
  const { user } = useUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <form ref={ref}>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {firstName?.charAt(0)} {lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="What's on your mind?"
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          <button className="hidden">Post</button>

          {/* Preview conditional check*/}

          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-full object-cover"
              />
            </div>
          )}

          <div className="flex justify-end mt-2 space-x-2">
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              <ImageIcon className="mr-2" color="currentColor" size={16} />
              {preview ? "Change" : "Add"} image
            </Button>

            {/* Add a remove preview button */}
            {preview && (
              <Button variant="outline">
                <XIcon className="mr-2" size={16} color="currentColor" /> Remove
                Image
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
