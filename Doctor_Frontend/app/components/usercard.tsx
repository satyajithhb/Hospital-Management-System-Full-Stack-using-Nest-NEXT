export default function UserCard(props: any) {

    return (<>
 
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={'http://localhost:8000/auth/photo/'+props.data.profile_photo} width={400} /></figure>
            <div className="card-body">
                <h2 className="card-title">Doc Info</h2>
                Doctor ID:  {props.data.id} <br />
                Doctor Name:  {props.data.doc_name} <br />
                Doctor Address:  {props.data.doc_address}<br />
                Doctor Speciality:  {props.data.Specialism}<br />
            </div>
            </div>

    </>);
}