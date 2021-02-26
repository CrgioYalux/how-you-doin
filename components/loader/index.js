const Loader = () => {
  return (
        <>
            <div className="spinner">
            </div>
            <style jsx="true">
                {`
                    .spinner {
                        position: absolute;
                        top: 45%;
                        left: 45%;
                        

                        border: 4px solid rgba(0, 0, 0, .1);
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        border-left-color: #09f;

                        animation: spin 1s linear infinite;
                        z-index: 100;
                    }

                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
            
                `}
            </style>
        </>
  )
}

export default Loader
