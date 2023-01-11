import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db, logout } from '../firebase'
import { query, collection, getDocs, where } from 'firebase/firestore'
import './Dashboard.css'

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth)
    const [name, setName] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return
        if (!user) return navigate('/')
        const fetchUserName = async () => {
            console.log(user)
            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', user?.uid)
                )
                const doc = await getDocs(q)
                console.log(doc)
                const data = doc.docs[0].data()
                setName(data.name)
            } catch (err) {
                console.log(err)
                alert('an error occured')
            }
        }
        if (user.displayName) {
            setName(user.displayName)
        } else {
            fetchUserName()
        }
    }, [user, loading, navigate])

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as
                <div>{name}</div>
                <div>{user?.email}</div>
                <button className="dashboard__btn" onClick={logout}>
                    Log out
                </button>
            </div>
        </div>
    )
}

export default Dashboard
