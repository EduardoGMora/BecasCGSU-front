import PropTypes from 'prop-types';

export const HeroCard = ({title, subtitle, children}) => {
    return (
        <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg py-16 px-8 md:px-16 mb-8 text-center">
            <h1 className="text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl mb-6 opacity-90">
            {subtitle}
            </p>
            {children && <div className="flex gap-4 max-w-2xl mx-auto mt-6 flex-col md:flex-row">{children}</div>}
        </section>
        );
}

HeroCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node,
};