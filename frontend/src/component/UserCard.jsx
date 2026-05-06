
import { BiDislike } from "react-icons/bi";

const UserCard = ({ data }) => {
  const { firstName, lastName } = data || {};


  return <>
    <div className="card bg-base-100 w-96 shadow-sm m-4">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <div className="badge badge-secondary">{firstName + " " + lastName}</div>
        </h2>
        <p>
          A card component has a figure, a body part, and inside body there
          are title and actions parts
        </p>
        <div className="card-actions justify-center ">
          <button className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>

          </button>
          <button className="btn btn-warning">


            <BiDislike size={17} />


          </button>
        </div>
      </div>
    </div>

  </>

}

export default UserCard;