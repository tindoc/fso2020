import React from 'react'

const PersonForm = ({handleNameChange, handleNumberChange, addName}) => {
    return (
        <form>
            <table>
                <tbody>
                    <tr>
                        <td>name:</td>
                        <td>
                            <input onChange={handleNameChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>number:</td>
                        <td>
                            <input onChange={handleNumberChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button type="submit" onClick={addName} >add</button>
            </div>
        </form>
    )
}

export default PersonForm