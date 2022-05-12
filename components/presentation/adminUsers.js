import React, { useState, useEffect } from "react"
import { useUsers } from "../application/useUsers"

const AdminUsers = () => {
  const { getUsers, updateUserRole } = useUsers()
  const [users, setUsers] = useState([])
  const roles = ["adminPost", "adminForum", "superAdmin", "user"]

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users)
    })
  }, [])

  // const handleChange = async (e) => {
  //   let user = users.find((user) => user.uid === e.target.name)
  //   console.log(user)
  //   if (user) {
  //     await updateUserRole(user)
  //     const updatedUsers = await getUsers()
  //     setUsers(updatedUsers)
  //   }
  // }

  const handleChange = async (e) => {
    const newRole = e.target.value
    const userUid = e.target.name
    await updateUserRole(userUid, newRole)
    const updatedUsers = await getUsers()
    setUsers(updatedUsers)
  }

  return (
    // <section>
    //   <h2 className="text-3xl text-center mt-12">Gestiona los usuarios</h2>
    //   {users.map((user) => {
    //     let check = ""
    //     user.role === "admin" ? (check = "checked") : (check = "")
    //     return (
    //       <div key={user.uid}>
    //         <label className="label cursor-pointer">
    //           <span className="label-text text-xl">{user.name}</span>
    //           <input
    //             type="checkbox"
    //             className="toggle toggle-primary"
    //             checked={check}
    //             onChange={handleChange}
    //             name={user.uid}
    //           />
    //         </label>
    //       </div>
    //     )
    //   })}
    // </section>
    <section>
      <h2 className="text-3xl text-center mt-12">Gestiona los usuarios</h2>
      {users.map((user) => {
        return (
          <div key={user.uid}>
            <label className="label cursor-pointer">
              <span className="label-text text-xl">{user.name}</span>
              <select
                className="select select-primary w-full max-w-xs"
                onChange={handleChange}
                name={user.uid}
                value={user.role}
              >
                {roles.map((role) => (
                  <option>{role}</option>
                ))}
              </select>
            </label>
          </div>
        )
      })}
    </section>
  )
}

export default AdminUsers
