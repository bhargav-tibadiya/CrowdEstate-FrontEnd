/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import styles from './OTP.module.scss'
import { IoMdArrowRoundBack } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";

const OTP = ({ formik, setIsOtpModalOpen }) => {

  const [otp, setOtp] = useState('');

  const inputRefs = useRef([]);


  const handleChange = (event, index) => {
    const { value } = event.target;

    setOtp(currentOtp => {
      const newOtp = currentOtp.split('');
      newOtp[index] = value;
      const updatedOtp = newOtp.join('');

      formik.setFieldValue('otp', updatedOtp);
      return updatedOtp;
    });

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };


  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !event.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className={styles.otp_container}>

      <div className={styles.content_container}>
        <div className={styles.heading} >Verify Email</div>
        <div className={styles.instructions} >A verification code has been sent to you. Enter the code below</div>
        <div className={styles.inputs} >
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type="number"
              maxLength={1}
              placeholder='-'
              value={otp[index] || ''}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <div className={styles.verify} >
          <button type='button' onClick={() => formik.handleSubmit()}>Verify and Register</button>
        </div>
        <div className={styles.actions} >
          <div className={styles.back} onClick={() => setIsOtpModalOpen(false), window.scrollTo(0, 0)}> <IoMdArrowRoundBack /> <span>Back to Sign Up</span> </div>
          <div className={styles.resend}><GrPowerReset /> <span>Resend Email</span> </div>
        </div>
      </div>

    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default OTP