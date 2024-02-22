import { SearchProps } from "@types";
import { stylesheet } from "@metro/common";
import { findByName, findByProps } from "@metro/filters";
import { ReactNative as RN } from "@metro/common";
import { Forms, TextInput } from "@ui/components";
import ErrorBoundary from "@ui/components/ErrorBoundary";
import { getAssetIDByName } from "@ui/assets";
const { FormIcon } = findByProps("FormIcon");


export default ({ onChangeText, placeholder, style }: SearchProps) => {
    function SearchIcon() {
        return <RN.Image style={{ transform: [{ scale: 0.8 }]}} source={getAssetIDByName("search")} />
    }
    const [query, setQuery] = React.useState("");
    const onChange = (value: string) => {
        setQuery(value);
        onChangeText?.(value);
    }
    return <ErrorBoundary>
        <RN.View style={style}>
            <TextInput isClearable grow
                leadingIcon={SearchIcon}
                placeholder={"Search"}
                onChange={onChange}
                returnKeyType={"search"}
                size="md"
                autoCapitalize="none"
                autoCorrect={false}
                value={query}
            />
        </RN.View>
    </ErrorBoundary>
}