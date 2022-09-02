export async function getVideoThumbnail(time_stamp: string)
{
    const res = await fetch(`http://localhost:6026/video_thumbnail?time_stamp=${time_stamp}`);

    console.log(await res.blob());
}
