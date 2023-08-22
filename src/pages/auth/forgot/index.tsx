import { IForgot } from "@/interfaces/auth";
import { authApi } from "@/services";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import * as Yup from "yup";
import { validate } from "@/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ForgotPage = () => {
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [captcha, setCaptcha] = useState("");

  const verifyRecaptchaCallback = useCallback((token: string) => {
    setCaptcha(token);
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .matches(validate.email, { message: "Vui lòng nhập đúng định dạng" }),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
    rePassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Your passwords do not match."
    ),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "", rePassword: "" },
  });

  const mailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRefreshReCaptcha((r) => !r);
  }, []);

  const onTest = async () => {
    if (mailRef.current?.value && mailRef.current.value !== "") {
      try {
        const params: IForgot = {
          recaptcha: captcha,
          email: mailRef.current.value,
          platform: "CLIENT",
        };
        await authApi.forgot(params);
        if (captcha === "") return setRefreshReCaptcha((r) => !r);
      } catch (error) {}
    }
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_KEY_CAPTCHA || ""}
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
      <GoogleReCaptcha
        refreshReCaptcha={refreshReCaptcha}
        onVerify={verifyRecaptchaCallback}
      />
    </GoogleReCaptchaProvider>
  );
};
export default ForgotPage;
