import React from 'react'

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    )
}

const Content = (props) => {
    return (
        <>
            {props.course.parts.map(
                part => <Part key={part.id} part={part.name} exercises={part.exercises} />
            )}
        </>
    )
}

const Total = (props) => {
    const total = props.course.parts
        .map(part => part.exercises)
        .reduce((acc, cur) => acc + cur, 0)
    return (
        <b>total of {total} exercises</b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course