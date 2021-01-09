import React from 'react';
import './UserCard.css';

function UserCard(props) {
    return (
        <div className="card">
            <a href={props.user.html_url} target="_blank" rel="noopener noreferrer">
                <h2 style={{fontSize: (props.user.name.length > 17) ? '12px': '18px'}}>{props.user.name}</h2>
            </a>
            <img className="profile-image" src={props.user.avatar_url} alt="avatar"/>
            
        </div>
    );
}

export default UserCard;