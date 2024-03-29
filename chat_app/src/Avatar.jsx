export default function Avatar ({userId, username}){
    const colors = ['bg-red-200','bg-blue-200','bg-green-200','bg-yellow-200','bg-pink-200','bg-purple-200','bg-indigo-200'];
    const UserIdBase10= parseInt(userId, 16); 
    const colorIndex = (UserIdBase10 % colors.length);
    const color = colors[colorIndex];
    return (
      <div className={"w-8 h-8 rounded-full flex items-center " + color}>
       <div className="text-center w-full opacity-70">{username[0]}</div> 
      </div>
    )
}