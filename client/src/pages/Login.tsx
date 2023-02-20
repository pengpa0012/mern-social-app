import { FormCover } from '../Components/FormCover'

export const Login = () => {
  const onSubmit = (e: any) => {
    e.preventDefault()
    const form = e.target
    const username = form.elements['username'].value
    const password = form.elements['password'].value
    if(!username || !password) return
  }
  return (
    <div className="grid place-items-center min-h-screen">
      <FormCover signup={false} onSubmit={onSubmit} />
    </div>
  )
}
