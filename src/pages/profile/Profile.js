import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout, getAccountDetails, selectToken, selectIsAuthenticated } from "../../reducers/authSlice";
import { useEffect, useState } from "react";
import styles from './Profile.module.css';
import { AiOutlineUser } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { BsDatabase } from "react-icons/bs";
import { Welcome } from "../welcome/Welcome";

export const Profile = () => {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const [view, setView] = useState('Account');


    useEffect(() => {
        if(!user) dispatch(getAccountDetails(token))
    }, [dispatch, token])

    const determineView = () => {
        switch(view) {
            case 'Account':
                return (
                    <>
                        <section className={styles.sectionHeader}>
                            <h2>Your account</h2>
                            <p>Manage your account information.</p>
                        </section>

                        <div className={styles.detailCard}>
                            <div className={styles.detailRow}>
                                <div>
                                    <div className={styles.label}>First name</div>
                                    <div className={styles.value}>{user.firstName}</div>
                                </div>
                                <button className={styles.button}>Edit name</button>
                            </div>
                            <div className={styles.detailRow}>
                                <div>
                                    <div className={styles.label}>Last name</div>
                                    <div className={styles.value}>{user.lastName}</div>
                                </div>
                                <button className={styles.button}>Edit name</button>
                            </div>
                            <div className={styles.detailRow}>
                                <div>
                                    <div className={styles.label}>Username</div>
                                    <div className={styles.value}>{user.username}</div>
                                </div>
                                <button className={styles.button}>Edit username</button>
                            </div>
                            <div className={styles.detailRow}>
                                <div>
                                    <div className={styles.label}>Email</div>
                                    <div className={styles.value}>{user.email}</div>
                                </div>
                                <button className={styles.button}>Edit email</button>
                            </div>
                            <div className={styles.detailRow}>
                                <div>
                                    <div className={styles.label}>Account created</div>
                                    <div className={styles.value}>{new Date(user.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.logoutContainer}>
                            <button className={styles.logoutButton} onClick={() => dispatch(logout())}>
                                Log out
                            </button>
                        </div>
                    </>
                )
                break;

            case 'Security':
                return (
                    <>
                        <section className={styles.sectionHeader}>
                            <h2>Account security</h2>
                            <p>Manage your account security below.</p>
                        </section>

                        <div className={styles.securityCard}>
                            <div className={styles.detailRow}>
                                <div>
                                    <div className={styles.label}>Password</div>
                                    <div className={styles.value}>Manage the password of your account</div>
                                </div>
                                <button className={styles.button}>Edit password</button>
                            </div>
                        </div>
                    </>
                )
                break;

            case 'Data':
                return (
                    <>
                        <section className={styles.sectionHeader}>
                            <h2>Account data</h2>
                            <p>Manage your personal data stored with LeetSave.</p>
                        </section>

                        <div className={styles.deleteCard}>
                            <div className={styles.detailRow}>
                                <div>
                                    <div className={styles.label}>Delete Account</div>
                                    <div className={styles.value}>Permanently delete your account and associated data from the LeetSave platform. Accounts cannot be restored once deleted.</div>
                                </div>
                                <button className={styles.button}>Delete</button>
                            </div>
                        </div>
                    </>
                )
                break;
            default:
                return <></>
        }
    }

    return (
        <div className={styles.wrapper}>
            {isAuthenticated && user ? (
                <div className={styles.container}>
                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarHeader}>
                            <h2 className={styles.welcome}>Welcome, {user.firstName} {user.lastName}.</h2>
                            <p className={styles.manage}>Manage your LeetSave account.</p>
                        </div>
                        <div className={styles.nav}>
                            <div className={`${styles.itemContainer} ${view === 'Account' ? styles.activeContainer : styles.inactiveContainer}`}>
                                <div className={styles.dot}></div>
                                <div className={styles.navItem} onClick={() => setView('Account')} value="Account">
                                    <AiOutlineUser className={styles.icon}/> 
                                    Account
                                </div>
                            </div>
                            <div className={`${styles.itemContainer} ${view === 'Security' ? styles.activeContainer : styles.inactiveContainer}`}>
                                <div className={styles.dot}></div>
                                <div className={styles.navItem} onClick={() => setView('Security')} value="Security">
                                    <MdLockOutline className={styles.icon}/> 
                                    Security
                                </div>
                            </div>
                            <div className={`${styles.itemContainer} ${view === 'Data' ? styles.activeContainer : styles.inactiveContainer}`}>
                                <div className={styles.dot}></div>
                                <div className={styles.navItem} onClick={() => setView('Data')} value="Data">
                                    <div></div>
                                    <BsDatabase className={styles.icon}/> 
                                    Data
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className={styles.main}>
                        {determineView()}
                    </main>
                </div>
            ): (
                <Welcome view="profile" />
            )}
        </div>
    );
}
