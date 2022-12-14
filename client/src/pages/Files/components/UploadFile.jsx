import { useParams } from "react-router-dom"
import { useState, Component } from "react"
import axios from "axios"
import { url as urlPost } from "../../../constants/urls"

const UploadFile = () => {
  const { dirname } = useParams()
  const url = `http://${urlPost.url}:${urlPost.port}/upload/${dirname}`

  const [files, setFiles] = useState(null)

  const uploadFiles = (e) => {
    setFiles(e)
  }

  const sendData = async () => {
    const f = new FormData()
    for (let index = 0; index < files.length; index++) {
      f.append("file", files[index])
    }

    await axios.post(url, f).then(() => {
      window.location.reload()
    })
  }

  return (
    <div className="sm:flex sm:items-center text-white overflow-hidden text-center">
      <input
        type="file"
        name="file"
        multiple
        onChange={(e) => uploadFiles(e.target.files)}
        className="file:bg-slate-500 file:text-white file:py-2 file:rounded-lg file:hover:bg-slate-400 mr-4"
      />
      <button
        className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-6 border-b-4 border-slate-700 hover:border-slate-500 rounded sm:mt-0 mt-6"
        onClick={() => sendData()}
      >
        Subir
      </button>
    </div>
  )
}
export default UploadFile
