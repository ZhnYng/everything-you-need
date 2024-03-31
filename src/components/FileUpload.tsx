"use client";

import { uploadDocument } from "@/lib/cloudStorage";
import React from "react";
import { Button } from "./ui/button";

const FileUpload = () => {
  return (
    <div className="p-2 bg-white rounded-xl">
      <form action={uploadDocument}>
        <input type='file' name='file'/>
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default FileUpload;