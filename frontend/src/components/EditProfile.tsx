import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { User, Edit3 } from 'lucide-react'
import EditFieldModal from './subcomponents/EditFieldModal'
// import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const { user, setUser } = useAuthContext()
//   const navigate= useNavigate();
//   if(!(user.isLoggedIn)){
//     navigate('/login');
//   }
  
  type EditMode = 'name' | 'gender' | 'dob' | 'password' | null

  const [editMode, setEditMode] = useState<EditMode>(null)

  const formatGender = (gender: string) => {
    switch (gender) {
      case 'male': return 'Male'
      case 'female': return 'Female'
      case 'other': return 'Other'
      case 'prefer-not-to-say': return 'Prefer not to say'
      default: return 'Not specified'
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified'
    
    try {
      const date = new Date(dateString)
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date'
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      console.error('Error formatting date for display:', error)
      return 'Invalid date'
    }
  }

  const getCurrentValue = () => {
    switch (editMode) {
      case 'name': return user?.displayName || ''
      case 'gender': return user?.gender || ''
      case 'dob': return user?.dob || ''
      case 'password': return '' // Password doesn't have a current value to display
      default: return ''
    }
  }

  const handleUpdate = async (updateData: any) => {
    try {
      const response = await fetch(`/api/update/${editMode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      })

      const data = await response.json()

      if (data.success) {
        // Update user context with new data (except for password)
        if (editMode !== 'password') {
          setUser(prev => ({
            ...prev,
            ...updateData
          }))
        }

        return { success: true }
      } else {
        return { success: false, message: data.message || 'Failed to update profile' }
      }
    } catch (err) {
      return { success: false, message: 'Something went wrong. Please try again.' }
    }
  }

  const openEditMode = (mode: EditMode) => {
    setEditMode(mode)
  }

  const closeEditMode = () => {
    setEditMode(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and account settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          {/* User Avatar Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-blue-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Email Display (Read-only) */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                <p className="text-lg text-gray-900 dark:text-white">{user?.email}</p>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                Cannot be changed
              </div>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="space-y-6">
            {/* Display Name */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                <p className="text-lg text-gray-900 dark:text-white">
                  {user?.displayName || 'Not specified'}
                </p>
              </div>
              <button
                onClick={() => openEditMode('name')}
                className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>

            {/* Gender */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</p>
                <p className="text-lg text-gray-900 dark:text-white">
                  {formatGender(user?.gender || '')}
                </p>
              </div>
              <button
                onClick={() => openEditMode('gender')}
                className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>

            {/* Date of Birth */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</p>
                <p className="text-lg text-gray-900 dark:text-white">
                  {formatDate(user?.dob || '')}
                </p>
              </div>
              <button
                onClick={() => openEditMode('dob')}
                className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Password</p>
                <p className="text-lg text-gray-900 dark:text-white">••••••••</p>
              </div>
              <button
                onClick={() => openEditMode('password')}
                className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Change
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Account created: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <EditFieldModal
          isOpen={!!editMode}
          onClose={closeEditMode}
          editType={editMode}
          currentValue={getCurrentValue()}
          onUpdate={handleUpdate}
          user={user}
        />
      )}
    </div>
  )
}

export default EditProfile