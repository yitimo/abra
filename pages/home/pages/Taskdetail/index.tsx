import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface IParams {
  id: string;
}

export default function PageTaskDetail() {
  const params = useParams<IParams>()
  const [info, setInfo] = React.useState<{
    name?: string,
    url?: string,
    localPath?: string,
    id?: string,
  }>({})
  React.useEffect(() => {
    resolveTaskInfo(params.id)
  }, [params])
  const resolveTaskInfo = async (id: string) => {
    try {
      const res = await axios.get(`./data/${id}.json?t=${Date.now()}`)
      setInfo(res.data || {})
    } catch (e) {
      alert(`请求失败: ${e.message}`)
    }
  }
  return (
    <div className="page-container flex-y">
      <div className="page-header">
        <h2>{info.name}</h2>
        <p>id: { info.id }</p>
        <p>站点: { info.url }</p>
        <p>本地目录: { info.localPath }</p>
      </div>
      <div className="page-body flex-1">主体</div>
      <div className="page-footer">底部</div>
    </div>
  )
}
