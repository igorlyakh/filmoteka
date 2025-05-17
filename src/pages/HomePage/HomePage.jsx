import { motion } from 'framer-motion';
import styles from './HomePage.module.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const HomePage = () => {
  return (
    <main className={styles.home}>
      <motion.div
        className={styles.container}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className={styles.title}
          variants={itemVariants}
        >
          Добро пожаловать в <span>Filmoteka</span>
        </motion.h1>

        <motion.p
          className={styles.description}
          variants={itemVariants}
        >
          Создавайте комнаты, приглашайте друзей и собирайте фильмы в общий список. Когда
          будете готовы — доверьтесь <span>случаю</span>, чтобы выбрать один фильм на
          вечер 🎬
        </motion.p>

        <motion.a
          href="/rooms"
          className={styles.cta}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          variants={itemVariants}
        >
          Создать комнату
        </motion.a>

        <motion.div
          className={styles.steps}
          variants={containerVariants}
        >
          <Step
            number="1"
            title="Создайте комнату"
            description="Начните с простой комнаты — вы будете первым участником."
          />
          <Step
            number="2"
            title="Пригласите друга"
            description="Отправьте приглашение, чтобы добавить другого участника."
          />
          <Step
            number="3"
            title="Добавьте фильмы"
            description="Составьте список фильмов и выберите один случайно."
          />
        </motion.div>
      </motion.div>
    </main>
  );
};

const Step = ({ number, title, description }) => {
  return (
    <motion.div
      className={styles.step}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
    >
      <div className={styles.stepNumber}>Шаг {number}</div>
      <div className={styles.stepTitle}>{title}</div>
      <p className={styles.stepDescription}>{description}</p>
    </motion.div>
  );
};

export default HomePage;
