// import React, {useState} from 'react';
// import {Button, ConfigProvider, Form, Input, message, Upload,GetProp, UploadFile, UploadProps} from 'antd';
// import axios from "axios";
// import {UploadOutlined} from "@ant-design/icons";
//
//
//
// /* eslint-disable no-template-curly-in-string */
// const validateMessages = {
//     required: '${label} مورد نیاز است !',
// };
//
//
//
// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
//
// const Register = () => {
//     const [form] = Form.useForm();
//     const [fileListMusic, setFileListMusic] = useState<UploadFile[]>([]);
//     const [fileListPic, setFileListPic] = useState<UploadFile[]>([]);
//     const [fileListVideo, setFileListVideo] = useState<UploadFile[]>([]);
//     const [uploading, setUploading] = useState(false);
//     const formData = new FormData();
//
//     const handleUpload = (values : any) => {
//         fileListMusic.forEach((file) => {
//           formData.append('music', file as FileType);
//         });
//          fileListPic.forEach((file) => {
//           formData.append('pic', file as FileType);
//         });
//           fileListVideo.forEach((file) => {
//           formData.append('video', file as FileType);
//         });
//         formData.append('name', values.music.name);
//         formData.append('description', values.music.description);
//
//         setUploading(true);
//         // You can use any AJAX library you like
//         fetch(`http://localhost:8000/music/`, {
//           method: 'POST',
//           body: formData,
//         })
//           .then((res) => res.json())
//           .then(() => {
//             setFileListMusic([]);
//             setFileListPic([]);
//             setFileListVideo([]);
//             message.success('بارگذاری شد');
//           })
//           .catch(() => {
//             message.error('عدم بارگذاری');
//           })
//           .finally(() => {
//             setUploading(false);
//           });
//       };
//
//   const props: UploadProps = {
//     onRemove: (file) => {
//       const index = fileListMusic.indexOf(file);
//       const newFileList = fileListMusic.slice();
//       newFileList.splice(index, 1);
//       setFileListMusic(newFileList);
//     },
//     beforeUpload: (file) => {
//       setFileListMusic([...fileListMusic, file]);
//       return false;
//     },
//     fileListMusic,
//   };
//
//
//    const props2: UploadProps = {
//     onRemove: (file) => {
//       const index = fileListPic.indexOf(file);
//       const newFileList = fileListPic.slice();
//       newFileList.splice(index, 1);
//       setFileListPic(newFileList);
//     },
//     beforeUpload: (file) => {
//       setFileListPic([...fileListPic, file]);
//       return false;
//     },
//     fileListPic,
//   };
//
//
//       const props3: UploadProps = {
//     onRemove: (file) => {
//       const index = fileListVideo.indexOf(file);
//       const newFileList = fileListVideo.slice();
//       newFileList.splice(index, 1);
//       setFileListVideo(newFileList);
//     },
//     beforeUpload: (file) => {
//       setFileListVideo([...fileListVideo, file]);
//       return false;
//     },
//     fileListVideo,
//   };
//
//
//
//     return (
//         <Form form={form}
//               autoComplete="off"
//               name="music"
//               layout="vertical"
//               onFinish={handleUpload}
//               validateMessages={validateMessages}
//         >
//             <Form.Item>
//                 <Form.Item name={['music', 'name']} className='!register-form-personal' label="نام آهنگ"
//                            rules={[{required: true}]}>
//                     <Input/>
//                 </Form.Item>
//                 <Form.Item name={['music', 'description']} className='!register-form-personal' label="شرح"
//                            rules={[{required: true}]}>
//                     <Input/>
//                 </Form.Item>
//                   <Form.Item name={['music', 'music']} className='!register-form-personal' label="فایل آهنگ"
//                            rules={[{required: true}]}>
//                         <Upload {...props} maxCount={1}>
//                           <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                         </Upload>
//                 </Form.Item>
//                 <Form.Item name={['music', 'pic']} className='!register-form-personal' label="فایل کاور">
//                       <Upload {...props2}>
//                           <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                         </Upload>
//                 </Form.Item>
//                 <Form.Item name={['music', 'video']} className='!register-form-personal' label="فایل موزیک ویدئو">
//                       <Upload {...props3}>
//                           <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                       </Upload>
//                 </Form.Item>
//             </Form.Item>
//             <Form.Item>
//                 <Form.Item>
//                     <Form.Item style={{margin: 8}}>
//                         <ConfigProvider theme={{
//                             components: {
//                                 Button: {
//                                     groupBorderColor: '#092b00',
//                                 }
//                             }, token: {
//                                 colorPrimary: '#52c41a'
//                             }
//                         }}>
//                             <Button type={"primary"} block htmlType="submit" loading={uploading}>
//                                {uploading ? 'در حال بارگزاری' : 'بارگزاری کردن'}
//                             </Button>
//                         </ConfigProvider>
//                     </Form.Item>
//                 </Form.Item>
//             </Form.Item>
//         </Form>
//     );
// }
//
// export default Register;