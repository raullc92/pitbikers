import React, { useState, useEffect } from "react"
import { UseUsers } from "../application/UseUsers"

const AdminUsers = () => {
  const { getUsers, updateUserRole } = UseUsers()
  const [users, setUsers] = useState([])
  const roles = ["adminPost", "adminForum", "superAdmin", "user"]

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users)
    })
  }, [])

  const handleChange = async (e) => {
    const newRole = e.target.value
    const userUid = e.target.name
    await updateUserRole(userUid, newRole)
    const updatedUsers = await getUsers()
    setUsers(updatedUsers)
  }

  return (
    <section className="mt-20 mb-32">
      <h2 className="text-3xl text-center mt-12 uppercase mb-7">
        Gestiona los usuarios
      </h2>
      {users.map((user) => {
        return (
          <div key={user.uid}>
            <label className="label cursor-pointer">
              <span className="label-text text-xl">{user.name}</span>
              <select
                className="select select-primary w-1/2 text-xl"
                onChange={handleChange}
                name={user.uid}
                value={user.role}
              >
                {roles.map((role) => (
                  <option key={`${user.uid}-${role}`}>{role}</option>
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
