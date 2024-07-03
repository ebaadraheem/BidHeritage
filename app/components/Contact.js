"use client"
import { React } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const getCurrentTimeIn12HourFormat = () => {
    const today = new Date();
    let hours = today.getHours();
    const minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    const time = hours + ':' + minutesStr + ' ' + ampm;
    return time;
  };

  async function SendMessage(data) {
    try {
      const response = await fetch('/api/Contact/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

    } catch (error) {
      console.error("Error here ", error)
    }
  }

  const onSubmit = data => {
    const myuuid = uuidv4();
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = date + "/" + month + "/" + year;
    const currentTime = getCurrentTimeIn12HourFormat();

    const messageDetail = {
      ...data,
      uniqueId: myuuid,
      time: currentTime,
      date: currentDate
    };
    SendMessage(messageDetail);
    toast.success("Message has been sent to developer")
    document.getElementById('my_modal_7').close();
    reset();
  };

  return (
    <div className=" bg-[#D2B48C] max-w-md mx-auto p-2 sm:p-4  rounded-lg  flex items-center justify-center">
      <div className="sm:p-6 max-sm:px-6 max-sm:py-3  rounded-lg  w-full ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <div className="text-center">
            <svg className="h-24 w-24 mx-auto" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.25366 13.9997L16.2419 14.0009C16.3459 14.1725 16.4732 14.3318 16.6227 14.4737L17.3413 15.1558C17.2557 15.4884 17.1162 15.8219 16.9207 16.1583C16.723 16.4982 16.4946 16.7953 16.2343 17.0518L15.44 16.787C14.5057 16.4754 13.4912 16.8324 12.9326 17.653L12.2111 18.713C11.5824 19.6368 11.6943 20.8988 12.4808 21.6884L12.7083 21.9164C12.1668 21.9728 11.5973 22.0008 11.0001 22.0008C8.11062 22.0008 5.87181 21.3442 4.30894 20.0006C3.48032 19.2882 3.00366 18.2498 3.00366 17.157V16.2497C3.00366 15.0071 4.01102 13.9997 5.25366 13.9997ZM17.0106 12.2448L17.5139 11.0579C17.75 10.5013 18.3154 10.1985 18.8699 10.314L18.9884 10.3452L19.6187 10.5466C20.2436 10.7463 20.7222 11.2817 20.8768 11.9539C21.2441 13.5516 20.8034 15.4967 19.5548 17.7893C18.3079 20.0786 16.9414 21.4551 15.455 21.9187C14.8779 22.0987 14.258 21.9679 13.7916 21.5764L13.6684 21.4632L13.1897 20.9826C12.7749 20.5662 12.6894 19.9073 12.9676 19.3919L13.0382 19.2757L13.7597 18.2157C14.0436 17.7986 14.5292 17.6013 14.9971 17.701L15.1241 17.7356L16.456 18.1798C16.9876 17.7775 17.4307 17.2712 17.7856 16.6609C18.0897 16.1378 18.2887 15.6076 18.3824 15.0703L18.4205 14.801L17.3115 13.7484C16.9462 13.4017 16.8135 12.8617 16.9628 12.3758L17.0106 12.2448ZM11.0001 2.00439C13.7615 2.00439 16.0001 4.24297 16.0001 7.00439C16.0001 9.76582 13.7615 12.0044 11.0001 12.0044C8.2387 12.0044 6.00012 9.76582 6.00012 7.00439C6.00012 4.24297 8.2387 2.00439 11.0001 2.00439Z" fill="#212121" />
            </svg>
          </div>

          <div className="flex flex-col gap-1 ">
            <label htmlFor="name" className="font-semibold">Full Name</label>
            <input
              id="name"
              {...register("name", { required: "Name is required", minLength: { value: 4, message: "Minimum 4 characters" }, maxLength: { value: 29, message: "Maximum 29 characters" } })}
              placeholder="Name"
              maxLength={30}
              className="w-full p-2 border rounded"
              aria-label="Full Name"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required", minLength: { value: 5, message: "Minimum 5 characters" }, maxLength: { value: 39, message: "Maximum 39 characters" } })}
              placeholder="Email"
              maxLength={40}
              className="w-full p-2 border rounded"
              aria-label="Email"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="contact_message" className="font-semibold">What can I help you with?</label>
            <textarea
              id="contact_message"
              {...register("contact_message", { required: "Please write a message", minLength: { value: 10, message: "Minimum 10 characters" }, maxLength: { value: 300, message: "Maximum 300 characters" } })}
              placeholder="Your message"
              maxLength={300}
              className="w-full p-2 border rounded resize-none h-28 sm:h-32"
              aria-label="Message"
            ></textarea>
            {errors.contact_message && <p className="text-red-500 text-xs">{errors.contact_message.message}</p>}
          </div>

          <div className="text-center">
            <button type="submit" className="bg-[#CC5500] text-white hover:bg-[#B64500] transition-all duration-200 py-2 mt-2 px-4 rounded">Submit</button>
          </div>

          <div className="sm:mt-4 text-center">
            <h1 className="text-lg font-semibold text-black">Contact Developer</h1>
            <p className="text-sm text-black">Get in touch via this form</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
