import styles from '../css/Container.module.css';

const Container = (props) => {
    return <section className={styles.container}>{props.children}</section>;
};

export default Container;
