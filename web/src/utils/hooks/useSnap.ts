import { useEffect, useState } from 'react'

export default function useSnap() {
    const [snap, setSnap] = useState(null)

    useEffect(() => {
        const myMidtransClientKey = process.env.MIDTRANS_CLIENT_KEY
        const script = document.createElement('script')
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
        script.setAttribute('data-client-key', myMidtransClientKey)
        script.onload = () => {
            setSnap(window.snap)
        }
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const snapEmbed = (snap_token: any, embedId: any, action: any) => {
        if (snap) {
            snap.embed(snap_token, {
                embedId,
                onSuccess: function (result: any) {
                    console.log('success', result)
                    action.onSuccess(result)
                },
                onPending: function (result: any) {
                    console.log('pending', result)
                    action.onPending(result)
                },
                onClose: function () {
                    action.onClose()
                }
            })
        }
    }

    return { snapEmbed }
}
