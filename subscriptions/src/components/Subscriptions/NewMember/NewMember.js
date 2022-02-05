const { Link } = require("react-router-dom");
const { default: Card } = require("../../UI/Card/Card");
const { default: MemberForm } = require("../MemberForm/MemberForm");

function NewMember() {
    return (
        <div className = 'form-container'>
        <Link to = '/subscriptions' className = 'link-back'><i className="fas fa-arrow-left"></i>Back</Link>
        <Card>
            <h3>Create Member</h3>
            <MemberForm action = 'add'/>
        </Card>

    </div>
    )
}

export default NewMember