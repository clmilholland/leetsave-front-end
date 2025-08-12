import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../reducers/authSlice";
import { Welcome } from "../welcome/Welcome";
import styles from './Study.module.css'

export const Study = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const determineView = () => {
        if(isAuthenticated) {
            return (
                <>
                
                </>
            )
        } else {
            return (
                <>
                    <Welcome view="study" />
                </>
            )
        }
    }

    return (
        <div className={styles.container}>
            {determineView()}
        </div>
    )
}