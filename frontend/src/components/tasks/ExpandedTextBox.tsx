// Opens a full text box on click when a text is too long to be displayed in a single line

import ReactDOM from 'react-dom';

interface ExpandedTextBoxProps {
    showFullText: { field: string; value: string; top: number; left: number };
    handleCollapseText: () => void;
}

const ExpandedTextBox: React.FC<ExpandedTextBoxProps> = ({ showFullText, handleCollapseText }) => {
    return ReactDOM.createPortal(
        showFullText.field && (
            <div
                className="expanded-textbox"
                style={{ top: showFullText.top, left: showFullText.left }}
                onClick={handleCollapseText}
            >
                {showFullText.value}
            </div>
        ),
        document.body
    );
};

export default ExpandedTextBox;
