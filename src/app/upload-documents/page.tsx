import FileUpload from "@/components/FileUpload";

const Page = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-4xl font-bold my-4">Add to the pool of information</h1>
      <FileUpload/>
    </div>
  )
}

export default Page;