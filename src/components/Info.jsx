import styles from '../css/Info.module.css';

const Info = ({ totalList, totalCounts, onDelete }) => {
    return (
        <div className={styles.info}>
            <div className={styles.infoTotal}>
                <p>{`Total List : ${totalList}`}</p>
            </div>
            <div className={styles.infoTotal}>
                <p>{`Total Counts : ${totalCounts}`}</p>
            </div>
            <button onClick={onDelete} className={styles.deleteAllButton}>
                Delete All List
            </button>
        </div>
    );
};

export default Info;
