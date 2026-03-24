export default function Card({children, className}){
    return(
        <div className={`p-5 mt-5 bg-slate-900 rounded-2xl flex items-center justify-between shadow-md transform transition-all duration-600 hover:scale-105 hover:shadow-xl ${className}`}>
            {children}
        </div>
    )
}