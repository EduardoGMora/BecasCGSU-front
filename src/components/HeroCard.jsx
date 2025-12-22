import PropTypes from 'prop-types';

/**
 * HeroCard component to display a prominent title, subtitle, and optional children elements
 * @param {Object} props
 * @param {string} props.title - Title text for the hero card
 * @param {string} props.subtitle - Subtitle text for the hero card
 * @param {JSX.Element|JSX.Element[]} [props.children] - Optional children elements (e.g., buttons)
 * @returns {JSX.Element} HeroCard component
 */
export const HeroCard = ({title, subtitle, children}) => {
    return (
        <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg py-16 px-8 md:px-16 mb-8 text-center">
          <h1 className="font-display text-5xl font-bold mb-4">{title}</h1>
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