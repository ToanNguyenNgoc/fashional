/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";


const ForgotPage = () => {
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false)
    const [captcha, setCaptcha] = useState('')
    const verifyRecaptchaCallback = useCallback((token: string) => {
        setCaptcha(token)
    }, [])
    const mailRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        setRefreshReCaptcha(r => !r)
    }, [])
    const onTest = async () => {
        if (mailRef.current?.value && mailRef.current.value !== "") {
            try {
                await axios.post(
                    'https://api.fashional.pro/v1/auth/forgot',
                    {
                        recaptcha: captcha,
                        email: mailRef.current.value,
                        platform: 'CLIENT'
                    }
                )
                if (captcha === "") return setRefreshReCaptcha(r => !r)
            } catch (error) {

            }
        }
    }
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_KEY_CAPTCHA || ''}
            scriptProps={{
                async: true,
                defer: true,
                appendTo: "head",
                nonce: undefined,
            }}
        >
            <div>
                <input ref={mailRef} type="text" placeholder="email" />
                ForgotPage
            </div>
            <button onClick={onTest}>Send test</button>
            <GoogleReCaptcha refreshReCaptcha={refreshReCaptcha} onVerify={verifyRecaptchaCallback} />
        </GoogleReCaptchaProvider>
    )
}
export default ForgotPage