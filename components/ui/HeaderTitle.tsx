import { withObservables } from "@nozbe/watermelondb/react";
import { Text } from "react-native";

import { userDetailCollection } from "~/database";
import UserDetail from "~/models/Userdetails";

const HeaderTitleComponent = ({ userDetail }: { userDetail: UserDetail[] }) => {
  const nickname = userDetail?.[0]?.nickname ?? "Exception";
  return <Text style={styles.headerTitle}>{nickname}</Text>;
};
const enhance = withObservables([], () => ({
  userDetail: userDetailCollection.query().observeWithColumns(["nickname"]),
}));

const EnhancedHeaderTitle = enhance(HeaderTitleComponent);

const styles = {
  headerTitle: {
    color: "white",
    fontFamily: "Poppins-Regular",
    paddingLeft: 10,
    fontSize: 20,
  },
};

export default EnhancedHeaderTitle;
