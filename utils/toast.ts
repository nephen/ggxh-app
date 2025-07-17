export const showToast = (msg: string) => {
  const toast = document.createElement('div')
  toast.className = 'fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-up z-[9999]'
  toast.textContent = msg
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}