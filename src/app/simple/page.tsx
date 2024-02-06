import {
  FrameContainer,
  FrameImage,
  FrameButton,
  useFramesReducer,
  getPreviousFrame,
  validateActionSignature,
} from "frames.js/next/server";

const reducer = (state: any) => ({ count: state.count + 1 });

const CONSTANTS = {
  DASHBOARD_URL: "https://dashboard.biconomy.io",
  DOCS_URL: "https://dashboard.biconomy.io",
  IMAGE_URL: "https://frames.biconomy.io/biconomy_orange_centred.png",
};

export default async function Page(props: {
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) {
  const previousFrame = getPreviousFrame(props.searchParams);

  await validateActionSignature(previousFrame.postBody);

  const [state, _dispatch] = useFramesReducer(
    reducer,
    { count: 0 },
    previousFrame,
  );

  return (
    <>
      <FrameContainer
        postUrl="/account"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage src={CONSTANTS.IMAGE_URL} />
        <FrameButton href={CONSTANTS.DASHBOARD_URL}>Dashboard</FrameButton>
        <FrameButton href={CONSTANTS.DOCS_URL}>Docs</FrameButton>
      </FrameContainer>
    </>
  );
}
