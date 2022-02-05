import Card from '../../UI/Card/Card'
import { Link } from 'react-router-dom'
import MemberForm from '../MemberForm/MemberForm'

function EditMember() {
    return (
        <div className = 'form-container'>
            <Link to = '/subscriptions' className = 'link-back'><i className="fas fa-arrow-left"></i>Back</Link>
            <Card>
                <h3>Edit Member</h3>
                <MemberForm action = 'edit'/>
            </Card>

        </div>
    )
}

export default EditMember