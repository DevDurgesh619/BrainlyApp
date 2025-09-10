import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/reateContentodal'
import { PlusIcon } from '../icons/plusIcon'
import { ShareIcon } from '../icons/Share'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../components/hooks/useContent'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const contents = useContent()

  // Load Twitter widget script once
  useEffect(() => {
    if (!(window as any).twttr) {
      const script = document.createElement("script")
      script.src = "https://platform.twitter.com/widgets.js"
      script.async = true
      document.body.appendChild(script)
    } else {
      (window as any).twttr.widgets.load()
    }
  }, [contents]) // re-run when new content is added

  return (
    <div>
      <Sidebar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false)
          }}
        />
        <div className='flex justify-end gap-4'>
          <Button
            startIcon={<ShareIcon size='md' />}
            variants='primary'
            text='share brain'
            size='md'
          />
          <Button
            onClick={() => { setModalOpen(true) }}
            startIcon={<PlusIcon size='md' />}
            variants='secondary'
            text='Add Content'
            size='md'
          />
        </div>
        <div className='flex gap-4 mt-4 flex-wrap'>
          {contents.map(({ title, type, link }) =>
            <Card
              key={link}
              type={type}
              link={link}
              title={title}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
